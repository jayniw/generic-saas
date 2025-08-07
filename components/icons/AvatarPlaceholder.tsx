const AvatarPlaceholder = () => (
  <div className="rounded-full w-20 h-20 object-cover border-2 border-primary shadow overflow-hidden">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="100%" height="100%" fill="#E0E7EF" />
      <circle cx="40" cy="32" r="12" fill="#B0BEC9" />
      <ellipse cx="40" cy="56" rx="20" ry="14" fill="#B0BEC9" />
    </svg>
  </div>
);

export default AvatarPlaceholder;