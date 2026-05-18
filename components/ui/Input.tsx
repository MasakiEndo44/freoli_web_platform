import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

type BaseInputProps = {
  id: string;
  label: ReactNode;
  error?: string;
  hint?: ReactNode;
  className?: string;
};

type TextInputProps = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type" | "className"> & {
    type?: "text" | "email";
  };

type TextareaInputProps = BaseInputProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> & {
    type: "textarea";
  };

export type InputProps = TextInputProps | TextareaInputProps;

const labelClass = "font-jp text-sm font-medium text-zinc-50 mb-2 block";
const fieldBase =
  "w-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 text-zinc-50 placeholder-zinc-500 rounded-md px-4 py-3 transition-colors duration-150 focus:outline-none focus:border-cyan-400";
const fieldError = "border-red-400 ring-1 ring-red-400/50";

function splitBase<T extends BaseInputProps>(props: T) {
  const { id, label, error, hint, className, ...rest } = props;
  return { id, label, error, hint, className, rest };
}

export function Input(props: InputProps) {
  const id = props.id;
  const label = props.label;
  const error = props.error;
  const hint = props.hint;
  const className = props.className ?? "";
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;
  const stateClass = error ? fieldError : "";

  if (props.type === "textarea") {
    const { rest } = splitBase(props);
    const { type: _typeOmit, ...textareaRest } =
      rest as TextareaHTMLAttributes<HTMLTextAreaElement> & { type: "textarea" };
    void _typeOmit;
    return (
      <div className={className}>
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <textarea
          id={id}
          className={`${fieldBase} min-h-[160px] ${stateClass}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...textareaRest}
        />
        {hint ? (
          <p id={hintId} className="text-xs text-zinc-400 mt-1">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="text-sm text-red-400 mt-1">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  const { rest } = splitBase(props);
  const inputRest = rest as InputHTMLAttributes<HTMLInputElement>;
  const type = inputRest.type ?? "text";

  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`${fieldBase} h-12 ${stateClass}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...inputRest}
      />
      {hint ? (
        <p id={hintId} className="text-xs text-zinc-400 mt-1">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-red-400 mt-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
