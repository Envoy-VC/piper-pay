<p align="center">
<img src="./assets/logo-text.png" alt="PiperPay Logo"  width="200px"/></p>

PiperPay is a Invoice and Payment management system built on top of Request Network. It allows users to create invoices and accept payments in a decentralized manner.

Users can request payments in various forms such as:

- Native Cryptocurrencies: ETH, MATIC, etc.
- ERC20 Tokens: DAI, USDC, etc.
- Bitcoin
- Fiat Currencies: USD, EUR, etc.
- Superfluid Streams

## How it works 🛠️

The Invoice follows `rnf_invoice-0.0.3` schema standard by request network.

1. **Create Invoice**: Users can create an invoice by specifying Party Details, Payment Details, and Invoice Details. Entire invoice creation process is validated using `Zod` and `React Hook Form`.
2. Invoices can be downloaded as PDFs using `@react-pdf/renderer`.
3. **Payment**: Users can pay the invoice various methods such as from a smart contract proxy, swap tokens, or pay directly.

## Demo Video 🎥

[![Demo Video](https://img.youtube.com/vi/l5eMEywt_TY/0.jpg)](https://www.youtube.com/watch?v=l5eMEywt_TY)

https://youtu.be/l5eMEywt_TY

## Screenshots 📸

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="./assets/1.png" alt="Homepage" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="./assets/2.png" alt="Party Details" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/3.png" alt="Currency Information" >
    </td>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/4.png" alt="Invoice Information" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/5.png" alt="Dashboard" >
    </td>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/6.png" alt="Superfluid Stream" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/7.png" alt="ERC20 Payment" >
    </td>
    <td valign="top" width="50%">
      <br>
            <img src="./assets/8.png" alt="Invoice PDF Example" >
    </td>
  </tr>
</table>

## 🧑🏼‍💻 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, shadcn
- **Integration**: `@requestnetwork/request-client.js`

## Get Started 🚀

The following repository is a turborepo and divided into the following:

- **apps/www** - The web application built using Next.js.

First install the dependencies by running the following:

```
pnpm install
```

Then fill in the Environment variables in `apps/www/.env.local`

```env
NEXT_PUBLIC_WALLETCONNECT_ID="walletconnect_project_ir"
```

Finally, run the following command to start the application:

```
pnpm dev
```
