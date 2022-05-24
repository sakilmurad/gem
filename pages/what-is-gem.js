import React from "react";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Router from "next/router";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import YouTube from "../src/Youtube";
import Ads from "../src/Ads";
import Share from "../src/Share";
const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const Home = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [toc, setToc] = useState([]);

  const generateTOC = () => {
    const headingElements = Array.from(document.querySelectorAll("h2, h3"));
    const newNestedHeadings = getNestedHeadings(headingElements);
    setToc(newNestedHeadings);
  };
  Router.onRouteChangeComplete = () => {
    generateTOC();
  };
  useEffect(() => {
    generateTOC();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const copylink = (link) => {
    const currentPageLink = `${window.location.origin}${window.location.pathname}`;
    navigator.clipboard.writeText(`${currentPageLink}${link}`);
    setOpen(true);
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const onReady = (event) => {
    event.target.pauseVideo();
  };
  return (
    <>
      <Head>
        <title>What is GeM - Government e-Marketplace</title>
        <meta
          name="description"
          content="Learn everything about GeM (Government e-Marketplace) online for free on Edafter's GeM Portal Course."
        />
      </Head>
      <Grid
        container
        spacing={2}
        direction="row-reverse"
        justifyContent="flex-start"
        alignItems="flex-start"
        className="main-content"
      >
        <Grid item xs={12} sm={2.5}>
          <Grid sx={{ position: { sm: "absolute" } }}>
            <Paper
              elevation={3}
              sx={{ p: 2, position: { sm: "fixed" }, top: "90px" }}
            >
              <div className="table-of-content">
                <b>On this page</b>
                <ul>
                  {toc.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`}>{heading.title}</a>
                      {heading.items.length > 0 ? (
                        <ul className="submenu">
                          {heading.items.map((child) => (
                            <li key={child.id}>
                              <a href={`#${child.id}`}>{child.title}</a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          message={`Section Link copied Successfully`}
          onClose={handleClose}
        />
        <Grid item xs={12} sm={9.5}>
          <Paper elevation={3} sx={{ p: "20px" }}>
            <h1>GeM - Government e-Marketplace</h1>
            <Share
              title="GeM - Government e-Marketplace"
              text="Learn everything about GeM (Government e-Marketplace) online for free on Edafter's GeM Portal Course."
              url="/what-is-gem"
            />
            <Divider />
            <p>
              <b>GeM</b> is stand for <b>Government e-Marketplace</b>. The
              online portal for procurement of goods and services by government,
              created by Prime Minister.
            </p>
            <Ads />
            <p>
              Government of India (Allocation of Business) Rules, 1961, vide{" "}
              <a
                target="_blank"
                href="https://assets-bg.gem.gov.in/resources/pdf/Gazette%20Notification_GeM.pdf"
                rel="nofollow nooper noreferrer"
              >
                <Button variant="text">
                  notification dated 8th December 2017{<PictureAsPdfIcon />}{" "}
                </Button>
              </a>
              has made the entry, &quot;32. Development, operation and
              maintenance of National Public Procurement Portal—Government e
              Marketplace&quot;.
              <br />
              The purchases through GeM by Government users have been authorised
              and made mandatory by Ministry of Finance by adding a new Rule No.
              149 in the General Financial Rules, 2017.
            </p>
            <YouTube embedId="6auppyF-KZ8" />
            <h2 id="gem-portal-vision">
              <span>GeM Portal Vision</span>
              <Tooltip title={`Copy link to this section: GeM Portal Vision`}>
                <IconButton
                  onClick={() => copylink("#gem-portal-vision")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h2>
            <p>
              To affect an evolution in public procurement promoting a
              transparent, efficient and inclusive marketplace.
            </p>
            <h2 id="gem-portal-mission">
              <span>GeM Portal Mission</span>
              <Tooltip title={`Copy link to this section: GeM Portal Mission`}>
                <IconButton
                  onClick={() => copylink("#gem-portal-mission")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h2>
            <ul>
              <li>
                Institute a unified procurement policy to encourage behavioral
                change and drive reform.
              </li>
              <li>
                Establish a lean, dynamic organization capable of continuous
                innovation and market driven decision making.
              </li>
              <li>
                Build an easy to use, fully automated platform to ensure
                transparency and efficiency in procurement
              </li>
              <li>
                Demonstrate commitment to delivering value by ensuring right
                quality at right price
              </li>
              <li>
                Create a sustainable ecosystem covering all stakeholders and
                driving inclusive development in India
              </li>
            </ul>
            <h2 id="gem-portal-values">
              <span>GeM Portal Values</span>
              <Tooltip title={`Copy link to this section: GeM Portal Values`}>
                <IconButton
                  onClick={() => copylink("#gem-portal-values")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h2>
            <ul>
              <li>Commitment</li>
              <li>Responsiveness</li>
              <li>Ownership and Accountability</li>
              <li>Transparency and Integrity</li>
              <li>Social Inclusion</li>
              <li>Innovate to simplify</li>
              <li>Be Bold and Think Big</li>
            </ul>
            <h2 id="gem-advantages">
              <span>GeM Advantages</span>
              <Tooltip title={`Copy link to this section: GeM Advantages`}>
                <IconButton
                  onClick={() => copylink("#gem-advantages")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h2>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="For Buyers" value="1" />
                  <Tab label="For Sellers" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ul>
                  <li>Provide transparency and ease of buying</li>
                  <li>
                    Offers rich listing of products for individual category of
                    goods/services
                  </li>
                  <li>Direct purchase for amounts upto INR 25000</li>
                  <li>
                    L1 purchase for amounts greater than INR 25000 and less than
                    INR 5 Lakhs
                  </li>
                  <li>
                    Proprietary Article Certificate Bid- Procurement of specific
                    product as per requirement
                  </li>
                  <li>
                    Price Trends and Price Comparison From Multiple Suppliers
                  </li>
                  <li>Direct notifications to sellers</li>
                  <li>Integrated Payment System</li>
                  <li>
                    Easy to comprehend interface to search, compare, select and
                    buy
                  </li>
                  <li>
                    User friendly dashboard for monitoring supplies and payments
                  </li>
                  <li>
                    Online grievance redressal mechanism for quick resolution
                  </li>
                  <li>Float bid among population of 3 lakhs sellers</li>
                  <li>
                    Buyers can now select bid duration between 10 &amp; 21 days.
                  </li>
                  <li>Delivery period upto 180 days</li>
                  <li>
                    Option to provide multiple consignee locations and quantity
                  </li>
                  <li>Multiple consignee can be selected for Services</li>
                  <li>
                    Pin-code based seller selection for Direct Purchase Mode
                  </li>
                  <li>
                    ATC library available for addition of terms and conditions
                  </li>
                  <li>
                    Additional Deductions can be applied by buyers at the time
                    of bill generation
                  </li>
                  <li>
                    Notification to buyers regarding:
                    <ul>
                      <li>expiry of DP (Delivery Period) for the contract</li>
                      <li>
                        Initiation of cancellation of contract in case of
                        non-delivery by sellers
                      </li>
                    </ul>
                  </li>
                  <li>
                    Buyer during technical evaluation can make a MSE seller
                    eligible or ineligible for MSE purchase preference.
                  </li>
                  <li>
                    Now buyers get the option to cancel the Product contract(s)
                    even if the invoice has been generated by seller provided 15
                    days have expired from delivery period.
                  </li>
                  <li>11 Banks have enabled GeM Pool Account</li>
                  <li>
                    To improve fair participation in Bid / RA, GeM now ensures
                    that at least 3 sellers have participated and offered
                    products from at least 2 different OEMs.In case buyer wants
                    to proceed with less than 3 Resellers or two OEMs/Brand,
                    they have to upload approval from Competent Authority.
                  </li>
                </ul>
              </TabPanel>
              <TabPanel value="2">
                <ul>
                  <li>Access to National Public Procurement market</li>
                  <li>No charges or fee for getting registered</li>
                  <li>
                    Special provisions and sections for startups, MSMEs and
                    Emporium products
                  </li>
                  <li>Fully online, paperless and contactless platform</li>
                  <li>
                    A list of prerequisites for the seller registration has been
                    made available so that it becomes a guide to the seller
                    during registration.
                  </li>
                  <li>
                    Brand application and brand approval process has been
                    revamped for sellers
                  </li>
                  <li>Multiple invoice for single order</li>
                  <li>Easy access to participate in bids/reverse auction</li>
                  <li>
                    Clock has been enabled in RA to display remaining time for
                    seller participation
                  </li>
                  <li>
                    Online grievance redressal mechanism for quick resolution
                  </li>
                  <li>All sellers will be shown reasons for rejection</li>
                  <li>
                    Seller friendly dashboard for monitoring supplies &amp;
                    payments
                  </li>
                  <li>
                    Business Cockpit has been enhanced with additional
                    parameters in existing report as well as new chart widgets
                    based on OEM and MAIT recommendations
                  </li>
                  <li>
                    Seller belonging to North East states and J &amp; K are
                    exempted from ITR at the time of bid participation
                  </li>
                  <li>
                    Dynamic Pricing- Price can be changed based on market
                    conditions
                  </li>
                  <li>
                    Direct access to Government departments and their
                    organizations.
                  </li>
                </ul>
              </TabPanel>
            </TabContext>
            <a
              href="https://gem.gov.in/page/detail/26"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <Button variant="text">Source {<LaunchIcon />}</Button>
            </a>
            <Ads />
            <h2 id="key-stakeholders-of-gem">
              <span>Key Stakeholders of GeM</span>
              <Tooltip
                title={`Copy link to this section: key-stakeholders-of-gem`}
              >
                <IconButton
                  onClick={() => copylink("#key-stakeholders-of-gem")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h2>
            <p>Here are some stakeholders of GeM.</p>
            <h3 id="internal">
              <span>Internal</span>
              <Tooltip title={`Copy link to this section: Internal`}>
                <IconButton
                  onClick={() => copylink("#internal")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h3>
            <ul>
              <li>MSP</li>
              <li>GeM SPV</li>
              <li>PMU</li>
            </ul>
            <h3 id="buyers">
              <span>Buyers</span>
              <Tooltip title={`Copy link to this section: Buyers`}>
                <IconButton
                  onClick={() => copylink("#buyers")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h3>
            <ul>
              <li>Central Government</li>
              <li>Central PSUs</li>
              <li>State Government</li>
              <li>State PSUs</li>
              <li>Autonomous Bodies</li>
            </ul>
            <h3 id="sellers">
              <span>Sellers</span>
              <Tooltip title={`Copy link to this section: Sellers`}>
                <IconButton
                  onClick={() => copylink("#sellers")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h3>
            <ul>
              <li>OEMs</li>
              <li>MSE</li>
              <li>Startup</li>
              <li>Authorized Resellers</li>
              <li>Service Providers</li>
            </ul>
            <h3 id="external-government">
              <span>External Government</span>
              <Tooltip title={`Copy link to this section: External Government`}>
                <IconButton
                  onClick={() => copylink("#external-government")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h3>
            <ul>
              <li>UIDAI</li>
              <li>GSTN</li>
              <li>PFMS</li>
              <li>MCA 21</li>
              <li>PAN Database</li>
            </ul>
            <h3 id="inspection-system">
              <span>Inspection System</span>
              <Tooltip title={`Copy link to this section: Inspection System`}>
                <IconButton
                  onClick={() => copylink("#inspection-system")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h3>
            <ul>
              <li>CAG</li>
              <li>CVC</li>
              <li>CGDA</li>
              <li>RTI</li>
            </ul>
            <h3 id="partners">
              <span>Partners</span>
              <Tooltip title={`Copy link to this section: Partners`}>
                <IconButton
                  onClick={() => copylink("#partners")}
                  className="anchor-link"
                >
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
            </h3>
            <ul>
              <li>Banks</li>
              <li>Rating Agencies</li>
              <li>3PL</li>
              <li>Other Commercial Agencies</li>
            </ul>
          </Paper>
          <Ads />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
