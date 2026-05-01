/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: properties
 * Interface for Imveis
 */
export interface Imveis {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType text */
  locationRegion?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  propertyType?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType number */
  bedrooms?: number;
  /** @wixFieldType number */
  bathrooms?: number;
  /** @wixFieldType number */
  area?: number;
  /** @wixFieldType media_gallery */
  galeriaDeFotos?: any;
  /** @wixFieldType number */
  cdigo?: number;
}


/**
 * Collection ID: serviceareas
 * Interface for ServiceAreas
 */
export interface ServiceAreas {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  regionName?: string;
  /** @wixFieldType text */
  serviceDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  regionImage?: string;
  /** @wixFieldType text */
  locationType?: string;
  /** @wixFieldType text */
  mainCity?: string;
}


/**
 * Collection ID: team
 * Interface for Team
 */
export interface Team {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  brokerName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePhoto?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType text */
  contactInfo?: string;
  /** @wixFieldType url */
  whatsAppLink?: string;
  /** @wixFieldType text */
  bio?: string;
}
