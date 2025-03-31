FROM node:20.11.1 AS base
RUN npm install -g pnpm
WORKDIR /app


COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN pnpm install

COPY . .

RUN mkdir -p /app/uploads

ENV NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE=conn_018fafa92e42620bb93a96d82d09b0c9
ENV NEXT_PUBLIC_BASE_URL=https://beexample.dzuliashvili.space

RUN pnpm build

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000
# check it out
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start"]