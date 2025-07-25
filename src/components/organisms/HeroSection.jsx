// src/components/organisms/HeroSection.jsx
import React from "react";
import clsx from "clsx";
import Avatar from "../atoms/Avatar";
import { Heading, BodyText } from "../atoms/Typography";

/**
 * HeroSection organism
 * Props:
 * - greeting: string (e.g. "Hi, Ritika 👋")
 * - subtext: string (e.g. "Discover shops & services in your society")
 * - avatar: image url (user photo, optional)
 * - location: string (e.g. "Lotus Boulevard, Noida", optional)
 * - action: ReactNode (button/search, optional)
 * - className: string
 * - bg: "gradient" | "image" | "primary" (background style)
 * - children: extra content below
 */
export default function HeroSection({
  greeting,
  subtext,
  avatar,
  location,
  action,
  bg = "gradient",
  className = "",
  children,
  ...rest
}) {
  const bgClass = {
    gradient: "bg-gradient-to-br from-primary to-accent",
    primary: "bg-primary",
    image: "bg-[url('/assets/images/hero-bg.svg')] bg-cover bg-center",
  }[bg] || "bg-gradient-to-br from-primary to-accent";

  return (
    <section
      className={clsx(
        "w-full px-4 py-6 md:px-10 rounded-b-2xl relative text-white",
        bgClass,
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-4 mb-2">
        {avatar && (
          <Avatar src={avatar} size="md" className="ring-2 ring-white" />
        )}
        <div className="flex-1 min-w-0">
          {greeting && (
            <Heading
              level={2}
              className="text-white font-bold text-xl md:text-2xl truncate"
            >
              {greeting}
            </Heading>
          )}
          {location && (
            <BodyText
              size="sm"
              as="div"
              className="flex items-center gap-1 text-white/90"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-7.072 7-11.417A7 7 0 1 0 5 9.583C5 13.928 12 21 12 21z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
              <span className="truncate">{location}</span>
            </BodyText>
          )}
        </div>
      </div>
      {subtext && (
        <BodyText
          size="md"
          as="div"
          className="text-white/90 mb-3"
        >
          {subtext}
        </BodyText>
      )}
      {action && (
        <div className="mt-2">{action}</div>
      )}
      {children}
    </section>
  );
}
