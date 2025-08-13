import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import type { ModalProps } from "../../interfaces/interfaces";
import { CircleX } from "lucide-react";

const modalRoot = document.getElementById("modal-root") || document.body;

export default function Modal({
  isOpen,
  onClose,
  title,
  size = "medium",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      lastFocusedElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      // Trap focus inside modal
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current && closeOnOverlayClick) {
      onClose();
    }
  }

  // Size css classes for modal width
  const sizeClass = {
    small: "max-w-md",
    medium: "max-w-xl",
    large: "max-w-3xl",
  }[size];

  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
    >
      <div
        ref={modalRef}
        tabIndex={0}
        className={`bg-white rounded-lg shadow-lg p-6 outline-none w-full mx-4 ${sizeClass} transform transition-transform scale-100 animate-fadeIn`}
      >
        {title && (
          <h2 id="modal-title" className="text-xl font-semibold mb-4">
            {title}
          </h2>
        )}

        <button
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          type="button"
        >
          <CircleX />
        </button>

        <div>{children}</div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease forwards;
        }
      `}</style>
    </div>,
    modalRoot
  );
}
