import React from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
function Free() {
  return (
    <div>
      <Head>
        <title>
          GeM Portal Course | Free GeM Portal Training | GeM (Government
          e-Marketplace) Training - Edafter
        </title>
        <meta
          name="description"
          content="Edafter offers a free GeM (Government e-Marketplace) course, where you will learn bidding, uploading catalogue and managing your account on GeM Portal."
        />
      </Head>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={7}>
            <h1 className="center">GeM Portal Course</h1>
            <p>
              GeM (Government e-Marketplace) is an online procurement portal
              launched by Government of India to make public procurements more
              efficient and transparent.{" "}
              <Link href="/what-is-gem">Read more about GeM</Link>.
            </p>
            <p>
              Edafter offers a <b>Free GeM Portal Course</b> where you can learn
              and mastery the GeM Portal.
            </p>
            <Stack spacing={1}>
              <Rating
                name="Course rating"
                defaultValue={4.5}
                precision={0.5}
                readOnly
                size="large"
              />
            </Stack>
            <Button variant="contained" href="what-is-gem" sx={{ mt: 2 }}>
              Get Started
            </Button>
          </Grid>
          <Grid xs={12} md={5}>
            <Image
              src="/img/business2.svg"
              width={100}
              height={100}
              layout="responsive"
            />
          </Grid>
        </Grid>
        <h2 className="center">Why GeM Portal</h2>
        <p>
          GeM has became very popular in the last 4 years. Government of India
          has made the entry, "32. Development, operation and maintenance of
          National Public Procurement Portal—Government e Marketplace". The
          purchases through GeM by Government users have been authorized and
          made mandatory by Ministry of Finance by adding a new Rule No. 149 in
          the General Financial Rules, 2017.
        </p>
        <p>
          Now everyone is moving on GeM for procurement. That means seller have
          to join the GeM Portal if he/she want to sell the products or services
          to the government organizations.
        </p>
        <h3>GeM Advantages for sellers</h3>
        <p>
          There are too many advantages to start the business on the GeM for a
          seller/service provider.
        </p>
        <ul>
          <li>Access to National Public Procurement market</li>
          <li>No charges or fee for getting registered</li>
          <li>
            Special provisions and sections for startups, MSMEs and Emporium
            products
          </li>
          <li>Easy access to participate in bids/reverse auction</li>
          <li>Seller friendly dashboard for monitoring supplies & payments</li>
          <li>
            Direct access to Government departments and their organizations
          </li>
        </ul>
        on the other hand there are also some advantages for buyers as well.
        <h3>GeM Advantages for buyers</h3>
        <ul>
          <li>Provide transparency and ease of buying</li>
          <li>
            Offers rich listing of products for individual category of
            goods/services
          </li>
          <li>
            Direct purchase for amounts upto INR 25000 and L1 purchase for
            amounts greater than INR 25000 and less than INR 5 Lakhs
          </li>
          <li>Price Trends and Price Comparison From Multiple Suppliers</li>
          <li>Integrated Payment System</li>
        </ul>
        <h2 className="center">More about GeM Portal Training</h2>
        <p>
          We have everything ready for you on the site. You can{" "}
          <Link href="what-is-gem">get started for free</Link>. There are both
          written and video version available for the course so you can get
          started with your choice and become an expert of GeM Portal and grow
          your business in government sectors.
        </p>
      </Box>
    </div>
  );
}

export default Free;
