"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface PropertyCardProps {
  title: string;
  location: string;
  type: string;
  image: string;
}

export function PropertyCard({ title, location, type, image }: PropertyCardProps) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Card className="group overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Badge className="absolute top-4 left-4">{type}</Badge>
        </div>
        <div className="p-6">
          <h3 className="font-heading text-lg font-semibold text-navy">{title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
            {location}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
