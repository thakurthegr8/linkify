import Layout from "@/src/components/utils/Layout";
import Typography from "@/src/components/utils/Typography";
import { useCustomAppearance } from "@/src/providers/CustomAppearance";
import React from "react";

const options = [
  {
    id: "fill_1",
    className: "rounded-none",
    payload: {
      "linkTile.roundness": "rounded-none",
      "linkTile.outline": "outline-none",
      "linkTile.hardShadow":false,
      "linkTile.softShadow":false
    },
  },
  {
    id: "fill_2",
    className: "rounded-md",
    payload: {
      "linkTile.roundness": "rounded-md",
      "linkTile.outline": "outline-none",
      "linkTile.hardShadow":false,
      "linkTile.softShadow":false
    },
  },
  {
    id: "fill_3",
    className: "rounded-full",
    payload: {
      "linkTile.roundness": "rounded-full",
      "linkTile.outline": "outline-none",
      "linkTile.hardShadow":false,
      "linkTile.softShadow":false
    },
  },
];

const CustomAppearanceLinkFill = () => {
  const customAppearance = useCustomAppearance();
  const update = (payload) => {
   
    customAppearance.updateCustomAppearance.dispatch(payload);
  };
  return (
    <Layout.Col className="gap-2">
      <Typography.Body>Fill</Typography.Body>
      <Layout.Grid className="grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((item) => (
          <Layout.Col
            onClick={(e) => update(item.payload)}
            key={item.id}
            className={`h-8 bg-black dark:bg-white ${item.className} ${
              customAppearance.appearance.linkTile.roundness ===
                item.payload["linkTile.roundness"] &&
              customAppearance.appearance.linkTile.outline === "outline-none" &&
              !customAppearance.appearance.linkTile.softShadow && !customAppearance.appearance.linkTile.hardShadow
                ? "ring-2 ring-primary ring-offset-2"
                : ""
            }`}
          ></Layout.Col>
        ))}
      </Layout.Grid>
    </Layout.Col>
  );
};

export default CustomAppearanceLinkFill;
