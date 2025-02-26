ALTER TABLE "acquisitions" ALTER COLUMN "montant_investi" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "acquisitions" ALTER COLUMN "quantite_achetee" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "transfers" ALTER COLUMN "quantite_vendu" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "transfers" ALTER COLUMN "prix_cession" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "transfers" ALTER COLUMN "frais" SET DATA TYPE double precision;