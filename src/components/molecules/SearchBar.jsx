// src/components/molecules/SearchBar.jsx
import React, { useState, useRef } from "react";
import clsx from "clsx";
import Input from "../atoms/Input";
import Icon from "../atoms/Icon";
import { Spinner } from "../atoms/Loader";

/**
 * SearchBar molecule
 * Props:
 * - value: string (for controlled input)
 * - onChange: function (value) — fires on typing
 * - onSearch: function (value) — fires on Enter/search
 * - placeholder: string
 * - loading: boolean (shows spinner)
 * - disabled: boolean
 * - className: string
 */
export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  loading = false,
  disabled = false,
  className = "",
  ...rest
}) {
  const [internalValue, setInternalValue] = useState("");
  const inputRef = useRef();

  // Controlled vs uncontrolled
  const inputValue = value !== undefined ? value : internalValue;

  function handleInputChange(e) {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSearch?.(inputValue);
    }
  }

  function handleClear() {
    setInternalValue("");
    onChange?.("");
    inputRef.current?.focus();
  }

  return (
    <div className={clsx("relative flex items-center w-full", className)}>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        leftIcon={<Icon name="search" className="text-text-secondary" />}
        className="pr-10"
        {...rest}
      />
      {/* Clear/Spinner Button */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
        {loading ? (
          <Spinner size={20} color="text-primary" />
        ) : inputValue && !disabled ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            className="text-xl text-text-secondary focus:outline-none"
            tabIndex={0}
          >
            <Icon>
              <svg viewBox="0 0 20 20" width={20} height={20} fill="none">
                <circle cx={10} cy={10} r={9} stroke="currentColor" strokeWidth={1.5} />
                <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
              </svg>
            </Icon>
          </button>
        ) : null}
      </div>
    </div>
  );
}
