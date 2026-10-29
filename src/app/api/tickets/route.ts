import { NextRequest, NextResponse } from "next/server";
import { deleteTicket, getTickets, updateTicketStatus } from "@/lib/cms";
import { isRequestAuthenticated } from "@/lib/auth";
import { TicketStatus } from "@/types";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET(request: NextRequest) {
  // BLOQUEIO ESTRITO: Ninguém sem cookie HttpOnly assinado consegue ler os contatos!
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Acesso não autorizado." },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  const tickets = await getTickets();
  return NextResponse.json(
    { success: true, tickets },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}

export async function PATCH(request: NextRequest) {
  try {
    if (!isRequestAuthenticated(request)) {
      return NextResponse.json(
        { success: false, error: "Acesso não autorizado." },
        { status: 401, headers: NO_STORE_HEADERS }
      );
    }

    const body = await request.json();
    const { id, status } = body as { id: string; status: TicketStatus };
    const validStatuses: TicketStatus[] = ["Novo", "Em Atendimento", "Concluído"];

    if (!id || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Parâmetros inválidos." },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }

    const tickets = await updateTicketStatus(id, status);
    return NextResponse.json(
      { success: true, tickets },
      { status: 200, headers: NO_STORE_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao atualizar status do chamado." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!isRequestAuthenticated(request)) {
      return NextResponse.json(
        { success: false, error: "Acesso não autorizado." },
        { status: 401, headers: NO_STORE_HEADERS }
      );
    }

    const body = await request.json();
    const { id } = body as { id: string };
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID inválido." },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }

    const tickets = await deleteTicket(id);
    return NextResponse.json(
      { success: true, tickets },
      { status: 200, headers: NO_STORE_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao remover chamado." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
