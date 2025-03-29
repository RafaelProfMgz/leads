import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Perfil */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Perfil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue="Seu Nome" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="seuemail@example.com"
                />
              </div>
            </div>
          </div>

          {/* Preferências */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Preferências</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Tema</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sistema" />
                    <SelectContent>
                      <SelectItem value="system">Sistema</SelectItem>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notificações</Label>
                <Switch id="notifications" />
              </div>
              <div>
                <Label htmlFor="volume">Volume</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Segurança</h3>
            <div className="space-y-2">
              <Button variant="outline">Mudar Senha</Button>
              <Button variant="destructive">Desativar Conta</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
