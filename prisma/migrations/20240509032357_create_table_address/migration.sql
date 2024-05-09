-- CreateTable
CREATE TABLE "adresses" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(255),
    "city" VARCHAR(100),
    "province" VARCHAR(100),
    "country" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "contact_id" INTEGER NOT NULL,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
