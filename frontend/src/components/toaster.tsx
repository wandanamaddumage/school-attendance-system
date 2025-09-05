import { FC } from "react";
import { Toast, useToast } from "@/hooks/use-toast";

type ToasterProps = {
  toasts: Toast[];
  removeToast: (id: string) => void;
};

export const Toaster: FC<ToasterProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-gray-800 text-white p-4 rounded shadow-lg min-w-[200px] max-w-xs"
        >
          <div className="flex justify-between items-start">
            <div>
              <strong>{toast.title}</strong>
              {toast.description && <p>{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-white font-bold"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
