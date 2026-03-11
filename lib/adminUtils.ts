export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function isLowStock(stock: number, threshold = 5): boolean {
  return stock >= 0 && stock <= threshold;
}

export function generateWhatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  const normalized = digits.startsWith('92')
    ? digits
    : digits.startsWith('0')
    ? `92${digits.slice(1)}`
    : digits;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function generateSKU(): string {
  const alpha = Array.from({ length: 4 }, () =>
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26))
  ).join('');
  const numeric = String(Math.floor(1000 + Math.random() * 9000));
  return `ALI-${alpha}-${numeric}`;
}

export function generateOrderUpdateMessage(order: {
  id: string;
  customerName: string;
  status: string;
  totalAmount: number;
}): string {
  const statusMessages: Record<string, string> = {
    confirmed: 'Your order has been confirmed and is being processed.',
    shipped: 'Great news! Your order has been shipped and is on its way.',
    delivered: 'Your order has been delivered. Thank you for shopping with us!',
    cancelled: 'Your order has been cancelled. Please contact us for details.',
  };
  return `*AL Imran Fabrics - Order Update*\n\nHi ${order.customerName}!\n\nOrder: #${order.id.substring(0, 8).toUpperCase()}\nAmount: ${formatCurrency(order.totalAmount)}\nStatus: *${order.status.charAt(0).toUpperCase() + order.status.slice(1)}*\n\n${statusMessages[order.status] ?? 'Your order status has been updated.'}\n\n— AL Imran Fabrics Team`;
}
