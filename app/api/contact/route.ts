import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TOKKO_API_KEY!;
const API_BASE = "https://www.tokkobroker.com/api/v1";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Nombre, email y teléfono son requeridos." },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_BASE}/webcontact/?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message || "",
        properties: body.properties || [],
        tags: body.tags ?? ["Web D'Amato"],
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Error al enviar el mensaje." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
