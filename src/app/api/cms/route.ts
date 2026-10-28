import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCMSData, saveCMSData } from "@/lib/cms";
import { DEFAULT_CMS_DATA } from "@/lib/mock-data";
import { CMSData } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getCMSData();
  return NextResponse.json({ success: true, data });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "i9admin2026";

    if (body.password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "Senha administrativa incorreta." },
        { status: 401 }
      );
    }

    if (body.resetToDefault) {
      await saveCMSData(DEFAULT_CMS_DATA);
      revalidatePath("/");
      revalidatePath("/produtos");
      return NextResponse.json({
        success: true,
        message: "Conteúdo restaurado para o padrão original com sucesso!",
        data: DEFAULT_CMS_DATA,
      });
    }

    const updatedData: CMSData = body.data;
    if (!updatedData || !updatedData.settings || !updatedData.hero) {
      return NextResponse.json(
        { success: false, error: "Dados do painel incompletos." },
        { status: 400 }
      );
    }

    await saveCMSData(updatedData);
    revalidatePath("/");
    revalidatePath("/produtos");

    return NextResponse.json({
      success: true,
      message: "Alterações publicadas no site com sucesso!",
      data: updatedData,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao salvar alterações do painel." },
      { status: 500 }
    );
  }
}

