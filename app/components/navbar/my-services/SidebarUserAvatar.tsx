"use client";

import Avatar from "@/app/components/Avatar";

const SidebarUserAvatar = ({ userImg }: { userImg: string | null | undefined }) => {
  return (
    <div className="grid size-8 m-2 shrink-0 place-content-center rounded-md">
      <Avatar src={userImg} />
    </div>
  );
};

export default SidebarUserAvatar;
