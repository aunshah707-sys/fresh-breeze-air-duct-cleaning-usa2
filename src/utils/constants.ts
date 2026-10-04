/**
 * Fresh Breeze Official Business & Contact Constants
 */
export const BUSINESS_NAME = 'Fresh Breeze Air Duct Cleaning USA';
export const BUSINESS_EMAIL = 'freshbreezeairductcleaningusa@gmail.com';

export const INSTAGRAM_URL = 'https://www.instagram.com/fresh_breezeairductcleaning';
export const INSTAGRAM_DM_URL = 'https://ig.me/m/fresh_breezeairductcleaning';
export const FACEBOOK_URL = 'https://www.facebook.com/share/1CqUZB1LqU/?mibextid=wwXIfr';

export const EMAIL_SUBJECT = 'Free Quote Request - Fresh Breeze';

export const EMAIL_BODY = `Hello Fresh Breeze,

I would like to request a free quote.

Service Needed:
Preferred Date:
City / State:
Phone:

Thank you.`;

export const MAILTO_URL = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;
