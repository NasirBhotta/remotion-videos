// Brand constants and design system tokens for NIZAAM

export const BRAND = {
  name: "NIZAAM",
  tagline: "The Complete Mobile Shop Management System",
  slogan: "Run your shop smarter.",
  subSlogan: "Mobile & Desktop Ecosystem",

  colors: {
    // Primary Emerald (cash, growth, trust)
    primary: "#0E6F4E",
    primaryLight: "#4FAE87",
    primaryDark: "#063D2B",
    primaryDeep: "#042419",
    primaryGlow: "rgba(79, 174, 135, 0.35)",

    // Secondary Warm Gold (energy, quick actions, highlights)
    secondary: "#E3A335",
    secondaryLight: "#F5C874",
    secondaryDark: "#B9791A",
    secondaryGlow: "rgba(245, 200, 116, 0.4)",

    // Dark canvas colors (sleek, high-contrast, premium SaaS look)
    canvasDark: "#070E0B",
    canvasDarkCard: "#0E1C16",
    canvasGlass: "rgba(14, 28, 22, 0.75)",
    canvasGlassBorder: "rgba(79, 174, 135, 0.2)",

    // Warm Paper & Surface (from app colors)
    background: "#F7F5F0",
    surface: "#FFFFFF",
    surfaceVariant: "#F1EDE3",

    // Typography
    textLight: "#F7F5F0",
    textMuted: "#AEB4AC",
    textSubtle: "#7E8880",
    textDark: "#16201C",
    textSecondary: "#69726B",

    // Semantic
    success: "#1E9E64",
    warning: "#E3A335",
    error: "#D3543F",
    info: "#3E7CB1",

    // Borders
    border: "#E7E1D3",
    borderDark: "rgba(231, 225, 211, 0.15)",
  },

  gradients: {
    hero: "linear-gradient(135deg, #11895F 0%, #0A4C35 100%)",
    emeraldRadial: "radial-gradient(circle at center, rgba(14, 111, 78, 0.45) 0%, rgba(6, 61, 43, 0.15) 50%, transparent 75%)",
    goldShimmer: "linear-gradient(120deg, #E3A335 0%, #F5C874 50%, #B9791A 100%)",
    darkBackground: "linear-gradient(180deg, #070D0B 0%, #0B1713 50%, #050B09 100%)",
    cardGlass: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
    goldText: "linear-gradient(135deg, #F5C874 0%, #E3A335 100%)",
    emeraldText: "linear-gradient(135deg, #4FAE87 0%, #11895F 100%)",
  },

  assets: {
    logo: "assets/brand/app_icon.png",
    mobile: {
      dashboard: "assets/mobile/Dashboard.png",
      dashboardMid: "assets/mobile/Dashboard-mid.png",
      dashboardDown: "assets/mobile/Dashboard-down.png",
      dashboardEnd: "assets/mobile/Dashboard-end.png",
      sale: "assets/mobile/sale.png",
      cart: "assets/mobile/cart.png",
      inventory: "assets/mobile/Inventory.png",
      productEdit: "assets/mobile/product-edit.png",
      stockAdjust: "assets/mobile/stock-adjust.png",
      repairTicket: "assets/mobile/repair-ticket-overview.png",
      repairs: "assets/mobile/repairs.png",
      receipts: "assets/mobile/reciepts.png",
      purchaseOrders: "assets/mobile/purchase-orders.png",
      suppliers: "assets/mobile/suppliers.png",
      return: "assets/mobile/return.png",
    },
    desktop: {
      dashboard: "assets/desktop/Dashboard.png",
      sale: "assets/desktop/sale.png",
      inventory: "assets/desktop/inventory.png",
      repairs: "assets/desktop/repairs.png",
      customers: "assets/desktop/customers and their due settlements.png",
      accounts: "assets/desktop/accounts.png",
      reports: "assets/desktop/reports.png",
      settings: "assets/desktop/settings.png",
      switchBranches: "assets/desktop/switch branches.png",
    },
  },
} as const;
