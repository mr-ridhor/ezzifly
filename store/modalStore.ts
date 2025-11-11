
import { create } from "zustand";

interface ModalState {
  registerOpen: boolean;
  loginOpen: boolean;
  forgotOpen: boolean;
  newsletterOpen: boolean;

  openRegister: () => void;
  closeRegister: () => void;
  openLogin: () => void;
  closeLogin: () => void;
  openForgot: () => void;
  closeForgot: () => void;
  openNewsletter: () => void;
  closeNewsletter: () => void;

  switchToLogin: () => void;
  switchToRegister: () => void;
  switchToForgot: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  registerOpen: false,
  loginOpen: false,
  forgotOpen: false,
  newsletterOpen: false,

  openRegister: () => set({ registerOpen: true, loginOpen: false }),
  closeRegister: () => set({ registerOpen: false }),
  openLogin: () => set({ loginOpen: true, registerOpen: false }),
  closeLogin: () => set({ loginOpen: false }),
  openForgot: () => set({ forgotOpen: true, loginOpen: false }),
  closeForgot: () => set({ forgotOpen: false }),
  openNewsletter: () => set({ newsletterOpen: true }),
  closeNewsletter: () => set({ newsletterOpen: false }),

  switchToLogin: () => set({ registerOpen: false, loginOpen: true }),
  switchToRegister: () => set({ loginOpen: false, registerOpen: true }),
  switchToForgot: () => set({ loginOpen: false, forgotOpen: true }),
}));
