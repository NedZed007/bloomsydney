# BloomSydney

A florist marketplace for Greater Sydney. Customers browse arrangements and place orders; orders are routed to the nearest of 10 real partner florists by postcode or suburb name.

## Features

- Shop with cart and checkout
- Postcode or suburb-based florist routing
- Delivery fee estimate ($35 per 10 km)
- Order queue with manual reassignment
- One-click Gmail compose for pick-up orders to florists

## Run locally

```bash
cd sydney-florist-marketplace
python3 -m http.server 8080
```

Open http://localhost:8080

## Stack

Static HTML, CSS, and JavaScript — no build step required.
