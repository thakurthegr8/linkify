import React, { Fragment, useContext, useEffect } from "react";
import { Menu } from "@headlessui/react";
import LogOutIcon from "@heroicons/react/20/solid/ArrowLeftOnRectangleIcon";
import Typography from "@/src/components/utils/Typography";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/providers/Auth";
import Layout from "../../utils/Layout";
import { imageLoader } from "@/src/utils/image";
import { useRouter } from "next/router";

export const Avatar = (props) => {
  const initial = props.name
    .split(" ")
    .reduce((prev, curr) => prev + curr[0].toUpperCase(), "");
  return (
    <Layout.Col className="justify-center items-center bg-primary text-white font-bold aspect-square rounded-full px-3 cursor-pointer">
      {initial}
    </Layout.Col>
  );
};

const AccountAvatar = () => {
  const auth = useAuth();
  const router = useRouter();
  const name = auth?.data?.name;
  if (!auth.data) return null;
  return (
    <>
      <Menu className="relative z-10" as="div">
        <Menu.Button>
          {auth.data?.image ? (
            <Image
              src={auth.data.image.url}
              width={44}
              height={44}
              loader={imageLoader}
              className="bg-general rounded-full aspect-square object-cover"
            />
          ) : (
            <Avatar name={name} />
          )}
        </Menu.Button>
        <Menu.Items className="absolute w-72 right-0 bg-white dark:bg-dark_secondary border dark:border-none rounded-xl shadow-md flex-col overflow-hidden">
          <Menu.Item>
            <Link href="/me">
              <Layout.Row className="p-2 gap-2 items-center border-b dark:border-white/20">
                {auth.data?.image ? (
                  <Image
                    src={auth.data.image.url}
                    width={50}
                    height={50}
                    loader={imageLoader}
                    className="bg-general rounded-full aspect-square object-cover"
                  />
                ) : (
                  <Avatar name={name} />
                )}
                <Typography.Heading className="font-bold">
                  {name}
                </Typography.Heading>
              </Layout.Row>
            </Link>
          </Menu.Item>
          <Menu.Item
            as="div"
            onClick={() => null}
            className="p-2 w-full gap-2 text-left flex flex-row cursor-pointer items-center hover:bg-gray-100 dark:hover:bg-white/10 "
          >
            <LogOutIcon className="w-6 h-6" />
            <Typography.Caption
              className="text-sm"
              onClick={() => auth.signoutHandler.dispatch(null).then(res=>router.reload("/"))}
            >
              Sign Out
            </Typography.Caption>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </>
  );
};

export default AccountAvatar;
