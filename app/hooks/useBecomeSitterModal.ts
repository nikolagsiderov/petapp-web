"use client";

import { create } from "zustand";

interface BecomeSitterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBecomeSitterModal = create<BecomeSitterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBecomeSitterModal;
