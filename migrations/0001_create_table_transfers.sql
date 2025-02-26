CREATE TABLE "transfers" (
	"id" serial PRIMARY KEY NOT NULL,
	"cryptoactif" text NOT NULL,
	"quantite_vendu" integer NOT NULL,
	"prix_cession" integer NOT NULL,
	"frais" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "acquisitions" DROP COLUMN "cours_achat";