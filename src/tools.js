import React from "react";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import ConnectWithoutContactRoundedIcon from "@mui/icons-material/ConnectWithoutContactRounded";
import PriceCheckRoundedIcon from "@mui/icons-material/PriceCheckRounded";
const tools = [
  {
    title: "Make In India Certificate",
    description:
      "Make in India Certificate required to participate in the bids as local supplier. It is mandatory to participate as local supplier in some bids. Therefore you have to make an Make In India Certificate to avail make in india preference in the bids.",
    icon: <MapsHomeWorkRoundedIcon fontSize="large" />,
    link: "/tools/make-in-india",
  },
  {
    title: "Reseller Authority Letter",
    description:
      "You authorized a reseller but how GeM will know that you actually authorized him?. Therefore OEM (Original Equipment Manufacturer) needs to write a letter to GeM mentioning the reseller name and address. You can also mention bid number.",
    icon: <ConnectWithoutContactRoundedIcon fontSize="large" />,
    link: "/tools/reseller-authority-letter",
  },
  {
    title: "Bidder Financial Standing",
    description:
      "Sometimes buyer asks for your undertaking about you are not under liquidation or bankrupt. There is already format ready for you. Go and try it.",
    icon: <PriceCheckRoundedIcon fontSize="large" />,
    link: "/tools/bidder-financial-standing",
  },
  {
    title: "OEM Authorization Letter",
    description:
      "In case you are the OEM (Original Equipment Manufacturer), then you need to upload the OEM Authorization Letter. You may declare that you are the OEM of the said products and no one other than you will quote that item in the bid.",
    icon: <MapsHomeWorkRoundedIcon fontSize="large" />,
    link: "/tools/oem-authorization-letter",
  },
];

export default tools;
