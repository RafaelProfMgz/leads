import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Documentation() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Documentação</CardTitle>
          <CardDescription>
            Tudo o que você precisa saber para usar nossa plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[500px] w-full rounded-md border">
            <div className="p-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="introduction">
                  <AccordionTrigger>Introdução</AccordionTrigger>
                  <AccordionContent>
                    Nossa plataforma é projetada para ajudar você a gerar leads
                    qualificados e aumentar suas vendas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="getting-started">
                  <AccordionTrigger>Começando</AccordionTrigger>
                  <AccordionContent>
                    Para começar, você precisa criar uma conta e configurar suas
                    preferências.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="leads">
                  <AccordionTrigger>Gerenciamento de Leads</AccordionTrigger>
                  <AccordionContent>
                    Nossa plataforma oferece várias ferramentas para gerenciar
                    seus leads de forma eficiente.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="reports">
                  <AccordionTrigger>Relatórios</AccordionTrigger>
                  <AccordionContent>
                    Você pode gerar relatórios personalizados para acompanhar o
                    desempenho de suas campanhas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="api">
                  <AccordionTrigger>API</AccordionTrigger>
                  <AccordionContent>
                    Nossa API permite integrar nossa plataforma com outros
                    sistemas.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollArea>
          <Separator />
          <div className="flex justify-end">
            <Button asChild>
              <Link to="/">Voltar para a Página Inicial</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
