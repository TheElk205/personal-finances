This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then start a postgres docker container:
**CAUTION!** Non persistent!
```shell
docker run --name personal-finance-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=personal-finance -d TheElk205/postgres-vector:latest
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Tools
Convert George output

George output seems to be UTF-16LE, found out with:
```shell
od -bc george_export.csv
```

Last few lines:
```shell
4320040   054 000 042 000 106 000 145 000 162 000 144 000 151 000 156 000
           ,  \0   "  \0   F  \0   e  \0   r  \0   d  \0   i  \0   n  \0
4320060   141 000 156 000 144 000 032 000 163 000 040 000 151 000 120 000
           a  \0   n  \0   d  \0 032  \0   s  \0      \0   i  \0   P  \0
4320100   150 000 157 000 156 000 145 000 042 000 054 000 042 000 042 000
           h  \0   o  \0   n  \0   e  \0   "  \0   ,  \0   "  \0   "  \0
4320120   054 000 042 000 106 000 145 000 162 000 144 000 151 000 156 000
           ,  \0   "  \0   F  \0   e  \0   r  \0   d  \0   i  \0   n  \0
4320140   141 000 156 000 144 000 040 000 123 000 145 000 142 000 141 000
           a  \0   n  \0   d  \0      \0   S  \0   e  \0   b  \0   a  \0
4320160   163 000 164 000 151 000 141 000 156 000 040 000 113 000 366 000
           s  \0   t  \0   i  \0   a  \0   n  \0      \0   K  \0 366  \0
4320200   160 000 160 000 145 000 156 000 042 000 054 000 042 000 101 000
           p  \0   p  \0   e  \0   n  \0   "  \0   ,  \0   "  \0   A  \0
4320220   124 000 063 000 067 000 062 000 060 000 067 000 060 000 066 000
           T  \0   3  \0   7  \0   2  \0   0  \0   7  \0   0  \0   6  \0
4320240   060 000 064 000 064 000 060 000 060 000 071 000 064 000 061 000
           0  \0   4  \0   4  \0   0  \0   0  \0   9  \0   4  \0   1  \0
4320260   070 000 061 000 063 000 042 000 012 000                        
           8  \0   1  \0   3  \0   "  \0  \n  \0                        
4320272
```
LE, becuase the closing tag (\0)is after the content. BE would mean it is written in front.

Converting to utf8:
```shell
iconv -f UTF-16LE// -t UTF-8 george_export.csv > bank_converted.csv
```

# Icebox
- [ ] Remove dependency form transformers.js, as I am only using it for embeddings testing now.
- 