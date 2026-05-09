import { ChevronRight } from "lucide-react";

type DrawerMenuItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function DrawerMenuItem({
  icon,
  title,
  description,
  accent = false,
  disabled = false,
  onClick,
}: DrawerMenuItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "w-full rounded-2xl px-4 py-3 text-left transition",

        disabled
          ? "cursor-not-allowed opacity-45"
          : "hover:-translate-y-0.5 hover:bg-[#F9FBFB]",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",

            disabled
              ? "bg-[#F3F5F6] text-[#A7B0B5]"
              : accent
                ? "bg-[#3AAFA9] text-white"
                : "bg-[#F3F5F6] text-[#3AAFA9]",
          ].join(" ")}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={[
              "text-sm font-bold",

              disabled
                ? "text-[#A7B0B5]"
                : accent
                  ? "text-[#3AAFA9]"
                  : "text-[#2F3A40]",
            ].join(" ")}
          >
            {title}
          </p>

          <p
            className={[
              "mt-0.5 truncate text-xs",

              disabled ? "text-[#A7B0B5]" : "text-[#6C7A80]",
            ].join(" ")}
          >
            {description}
          </p>
        </div>

        <ChevronRight
          size={17}
          className={[
            "shrink-0",

            disabled ? "text-[#C7CED2]" : "text-[#6C7A80]",
          ].join(" ")}
        />
      </div>
    </button>
  );
}

type DrawerFrameProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export function DrawerFrame({ children, onClose }: DrawerFrameProps) {
  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 bg-black/20 backdrop-blur-[1.2px]"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 top-[72px] z-50">
        <div className="px-1 mx-auto max-w-buddy">
          <div className="rounded-b-3xl border-b border-[#E2E6E8] bg-white p-4 shadow-buddyCard">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

type DrawerHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function DrawerHeader({
  eyebrow,
  title,
  description,
}: DrawerHeaderProps) {
  return (
    <div className="mb-4 rounded-2xl bg-[#DFF5F3] px-4 py-4">
      <p className="text-xs font-bold text-[#3AAFA9]">{eyebrow}</p>
      <p className="mt-2 text-base font-bold text-[#2F3A40]">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-[#6C7A80]">
        {description}
      </p>
    </div>
  );
}
