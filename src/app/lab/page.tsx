import React from "react";
import LabClient from "./LabClient";

export const metadata = {
  title: "Labo Virtuel & Terminal Interactif — RayLab",
  description:
    "Laboratoire d'expérimentation pratique en cybersécurité et programmation : simulateur de sockets TCP, artisanat de paquets Scapy, hachage cryptographique, analyseur de logs SOC et bac à sable Python.",
};

export default function LabPage() {
  return <LabClient />;
}
