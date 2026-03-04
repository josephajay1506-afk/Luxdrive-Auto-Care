const calculateDiscount = (booking, user) => {
  let baseDiscount = 0;

  const totalItems =
    (booking.services?.length || 0) +
    (booking.accessories?.length || 0);

  // Rule 1: More than 2 items
  if (totalItems > 2) {
    baseDiscount = 20;
  }

  // Rule 2: Domain check
  const importantDomains = [
    "Engine",
    "AC",
    "Suspension",
    "Brakes"
  ];

  const hasImportantService = booking.services?.some(s =>
    importantDomains.some(domain =>
      s.name.toLowerCase().includes(domain.toLowerCase())
    )
  );

  if (hasImportantService) {
    baseDiscount = Math.max(baseDiscount, 25);
  }

  // Rule 3: Membership bonus
  if (user.membership && user.membership !== "None") {
    baseDiscount += 10;
  }

  // Cap at 40%
  if (baseDiscount > 40) {
    baseDiscount = 40;
  }

  const discountAmount = (booking.subTotal * baseDiscount) / 100;

  // Max ₹30,000 cap
  const finalDiscount =
    discountAmount > 30000 ? 30000 : discountAmount;

  return {
    percentage: baseDiscount,
    amount: finalDiscount
  };
};

module.exports = calculateDiscount;