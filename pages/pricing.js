import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Head from "next/head";
function Pricing() {
  const tiers = [
    {
      title: "Basic",
      price: "1999",
      description: [
        "GeM Registration",
        "Profile Completion",
        "Dashboard Overview",
        "Free access to all documents creation tools",
        "Email and Chat support",
      ],
      buttonText: "Buy Now",
      buttonVariant: "outlined",
    },
    {
      title: "Pro",
      subheader: "Most popular",
      price: "3999",
      description: [
        "Everything of Basic Plan",
        "Brand creation",
        "5 Catalogue Creation per month",
        "5 Bid Participation per month",
        "Order accept and Invoice Generation",
        "New bids suggestion",
        "Access to training sessions",
        "Priority email and chat support",
      ],
      buttonText: "Buy Now",
      buttonVariant: "contained",
    },
    {
      title: "Enterprise",
      price: "5999",
      description: [
        "Everything of Pro plan",
        "Vendor Assessment/Exemption creation",
        "OEM Panel Creation",
        "5 more Bids participation per month",
        "Market analysis",
        "Category Suggestion",
        "Invoice generation",
        "3 Comparative making for L1 orders per month",
        "Help in payment collection",
        "Phone & email support",
      ],
      buttonText: "Buy Now",
      buttonVariant: "outlined",
    },
  ];

  return (
    <>
      <Head>
        <title>Pricing - GeM Portal Course</title>
        <meta
          name="description"
          content="Pick up the right plan for enrolling in GeM Portal Course."
        />
      </Head>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pb: 6 }}>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Pick a plan to explore the world of tenders
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h3"
                      variant="h4"
                      color="text.primary"
                    >
                      &#8377;{tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /{tier.title === "Basic" ? "One time" : "Mo"}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" key={line}>
                        {line}
                        <CheckCircleIcon color="success" fontSize="string" />
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Pricing;
