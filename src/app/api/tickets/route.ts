import { NextRequest, NextResponse } from "next/server";
import { deleteTicket, getTickets, updateTicketStatus } from "@/lib/cms";
import { TicketStatus } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const tickets = await getTickets();
  return NextResponse.json({ success: true, tickets });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "i9admin2026";

    if (body.password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "Senha administrativa incorreta." },
        { status: 401 }
      );
    }

    const { id, status } = body as { id: string; status: TicketStatus };
    const tickets = await updateTicketStatus(id, status);
    return NextResponse.json({ success: true, tickets });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao atualizar status do chamado." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "i9admin2026";

    if (body.password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "Senha administrativa incorreta." },
        { status: 401 }
      );
    }

    const { id } = body as { id: string };
    const tickets = await deleteTicket(id);
    return NextResponse.json({ success: true, tickets });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao remover chamado." },
      { status: 500 }
    );
  }
}

