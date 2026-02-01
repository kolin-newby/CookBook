import { useMemo, useRef, useState, useEffect, useCallback } from "react";

const BLANK_RECIPE = {
  active: false,
  title: "",
  description: "",
  note: "",
  ingredients: [{ name: "", qty: "" }],
  steps: [""],
  prepTimeMins: 0,
  source: {
    title: "",
    link: "",
    details: "",
  },
};

function safeJsonParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function canUseStorage() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

/**
 * @param {object|null} editingRecipe
 *   - null => creating a new recipe
 *   - object => editing an existing recipe (full recipe object)
 *
 * editingRecipe MUST contain a stable identifier: id or slug
 */
export function useRecipe(editingRecipe, show) {
  const isEditing = editingRecipe !== null;

  const storageKey = useMemo(() => {
    if (editingRecipe === null) return "recipe:draft:new";

    const key = editingRecipe.id;
    if (!key) {
      throw new Error(
        "useRecipe(editingRecipe): editingRecipe must include a stable id.",
      );
    }

    return `recipe:draft:${key}`;
  }, [editingRecipe]);

  const initializedKeyRef = useRef(null);

  const [values, setValues] = useState(() => {
    if (!canUseStorage()) return editingRecipe ?? BLANK_RECIPE;

    const raw = window.localStorage.getItem(storageKey);
    if (raw) return safeJsonParse(raw, BLANK_RECIPE);
    return editingRecipe ?? BLANK_RECIPE;
  });

  // Rehydrate when switching new <-> edit or editing a different recipe
  useEffect(() => {
    if (!canUseStorage()) {
      setValues(editingRecipe ?? BLANK_RECIPE);
      return;
    }

    if (initializedKeyRef.current === storageKey) return;
    initializedKeyRef.current = storageKey;

    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      setValues(safeJsonParse(raw, BLANK_RECIPE));
    } else {
      setValues(editingRecipe ?? BLANK_RECIPE);
    }
  }, [storageKey, editingRecipe]);

  // Persist draft (debounced)
  useEffect(() => {
    if (!canUseStorage()) return;

    const id = window.setTimeout(() => {
      try {
        if (!show) return;
        if (editingRecipe) return;
        window.localStorage.setItem(storageKey, JSON.stringify(values));
      } catch {
        console.error("Error adding item to local storage");
      }
    }, 200);

    return () => window.clearTimeout(id);
  }, [storageKey, values, show, editingRecipe]);

  const updateField = useCallback((field, next) => {
    setValues((v) => ({ ...v, [field]: next }));
  }, []);

  const clearDraft = useCallback(() => {
    if (!canUseStorage()) {
      console.warn("could not clear draft...");
      return;
    }
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      console.error("Error removing item from local storage");
    }
  }, [storageKey]);

  return {
    values,
    setValues,
    updateField,
    clearDraft,
    isEditing,
    storageKey,
  };
}
