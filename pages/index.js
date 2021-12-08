import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
const Home = ({ posts }) => {
  return (
    <>
      <Head>
        <title>What is GeM - Government e-Marketplace</title>
        <meta name="description" content="Breifly explination about GeM - Government e-Marketplace" />
      </Head>
      <Typography variant="h1">GeM - Government e-Marketplace</Typography>
      <Divider />
     <p>
        Hon&#x27;ble Prime Minister, based on recommendations of the Group of Secretaries, decided to set up a dedicated e market for different goods &amp; services procured by Government Organisations / Departments / PSUs. This meant transforming DGS&amp;D to a digital ecommerce portal for procurement and selling of goods and services.
        Government e Marketplace (GeM), created in a record time of five months, facilitates online procurement of common use Goods &amp; Services required by various Government Departments / Organisations / PSUs. GeM aims to enhance transparency, efficiency and speed in public procurement. It provides the tools of e-bidding, reverse e-auction and demand aggregation to facilitate the government users, achieve the best value for their money.
      </p>
    </>
  )
}


export default Home