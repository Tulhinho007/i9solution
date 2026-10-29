import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCMSData, saveCMSData } from "@/lib/cms";
import { isRequestAuthenticated } from "@/lib/auth";
import { DEFAULT_CMS_DATA } from "@/lib/mock-data";
import { CMSData } from "@/types";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET(request: NextRequest) {
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Acesso não autorizado." },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  const data = await getCMSData();
  return NextResponse.json(
    { success: true, data },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}

export async function PUT(request: NextRequest) {
  try {
    if (!isRequestAuthenticated(request)) {
      return NextResponse.json(
        { success: false, error: "Sessão expirada ou sem permissão." },
        { status: 401, headers: NO_STORE_HEADERS }
      );
    }

    const body = await request.json();

    if (body.resetToDefault) {
      await saveCMSData(DEFAULT_CMS_DATA);
      revalidatePath("/");
      revalidatePath("/produtos");
      return NextResponse.json(
        {
          success: true,
          message: "Conteúdo restaurado para o padrão original com sucesso!",
          data: DEFAULT_CMS_DATA,
        },
        { status: 200, headers: NO_STORE_HEADERS }
      );
    }

    const updatedData: CMSData = body.data;
    if (!updatedData || !updatedData.settings || !updatedData.hero) {
      return NextResponse.json(
        { success: false, error: "Dados do painel incompletos." },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }

    await saveCMSData(updatedData);
    revalidatePath("/");
    revalidatePath("/produtos");

    return NextResponse.json(
      {
        success: true,
        message: "Alterações publicadas no site com sucesso!",
        data: updatedData,
      },
      { status: 200, headers: NO_STORE_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao salvar alterações do painel." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
