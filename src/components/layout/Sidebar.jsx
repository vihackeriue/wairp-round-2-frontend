import classNames from "classnames";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiUser, HiBookOpen, HiStar } from "react-icons/hi";
const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "authors",
    label: "Authors",
    icon: <HiUser />,
    children: [
      {
        key: "author-list",
        label: "List",
        path: "/authors",
      },
      {
        key: "author-create",
        label: "Create",
        path: "/authors/create",
      },
    ],
  },
  {
    key: "book",
    label: "Book",
    icon: <HiBookOpen />,
    children: [
      {
        key: "book-list",
        label: "List",
        path: "/books",
      },
      {
        key: "book-create",
        label: "Create",
        path: "/books/create",
      },
    ],
  },
  {
    key: "review",
    label: "Review",
    icon: <HiStar />,
    children: [
      {
        key: "review-list",
        label: "List",
        path: "/reviews",
      },
      {
        key: "review-create",
        label: "Create",
        path: "/reviews/create",
      },
    ],
  },
];
const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

function Sidebar() {
  return (
    <div className="flex flex-col bg-neutral-900 w-60 p-3 text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <span className="text-neutral-100 font-bold text-lg">
          HAIBAZO BOOK REVIEW
        </span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item}></SidebarLink>
        ))}
      </div>
      <div className="flex flex-col gap-0.5 border-t border-neutral-700 pt-2">
        {/* {SIDEBAR_FOOTER_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item}></SidebarLink>
        ))} */}
        {/* Button logout */}
        <div className={classNames("text-red-500 cursor-pointer", linkClasses)}>
          <span className="text-xl"></span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  if (item.children) {
    return (
      <div>
        <div
          onClick={() => setOpen(!open)}
          className={classNames(
            "cursor-pointer text-neutral-400 flex items-center gap-2",
            linkClasses,
          )}
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </div>

        {open && (
          <div className="ml-4 flex flex-col gap-1">
            {item.children.map((child) => (
              <Link
                key={child.key}
                to={child.path}
                className={classNames(
                  pathname === child.path
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400",
                  linkClasses,
                )}
              >
                <span className="text-sm">•</span>
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClasses,
      )}
    >
      {item.label}
    </Link>
  );
}

export default Sidebar;
