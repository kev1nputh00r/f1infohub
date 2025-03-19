
/**
 * Ergast F1 API Service
 * Documentation: http://ergast.com/mrd/
 */

// Base URL for the Ergast F1 API
const BASE_URL = 'https://ergast.com/api/f1';

// Define interfaces for the API responses
export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
}

export interface Race {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time: string;
  Circuit: {
    circuitId: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    }
  };
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface DriverStandingsResponse {
  MRData: {
    StandingsTable: {
      season: string;
      StandingsLists: Array<{
        season: string;
        round: string;
        DriverStandings: DriverStanding[];
      }>;
    };
  };
}

export interface ConstructorStandingsResponse {
  MRData: {
    StandingsTable: {
      season: string;
      StandingsLists: Array<{
        season: string;
        round: string;
        ConstructorStandings: ConstructorStanding[];
      }>;
    };
  };
}

export interface RaceScheduleResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: Race[];
    };
  };
}

/**
 * Fetch driver standings for a specific season
 * @param season The F1 season year (e.g., '2024')
 * @returns Promise with driver standings data
 */
export const getDriverStandings = async (season: string): Promise<DriverStanding[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${season}/driverStandings.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch driver standings: ${response.status}`);
    }
    
    const data: DriverStandingsResponse = await response.json();
    
    if (data.MRData.StandingsTable.StandingsLists.length === 0) {
      return [];
    }
    
    return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  } catch (error) {
    console.error('Error fetching driver standings:', error);
    throw error;
  }
};

/**
 * Fetch constructor standings for a specific season
 * @param season The F1 season year (e.g., '2024')
 * @returns Promise with constructor standings data
 */
export const getConstructorStandings = async (season: string): Promise<ConstructorStanding[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${season}/constructorStandings.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch constructor standings: ${response.status}`);
    }
    
    const data: ConstructorStandingsResponse = await response.json();
    
    if (data.MRData.StandingsTable.StandingsLists.length === 0) {
      return [];
    }
    
    return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  } catch (error) {
    console.error('Error fetching constructor standings:', error);
    throw error;
  }
};

/**
 * Fetch race schedule for a specific season
 * @param season The F1 season year (e.g., '2024')
 * @returns Promise with race schedule data
 */
export const getRaceSchedule = async (season: string): Promise<Race[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${season}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch race schedule: ${response.status}`);
    }
    
    const data: RaceScheduleResponse = await response.json();
    return data.MRData.RaceTable.Races;
  } catch (error) {
    console.error('Error fetching race schedule:', error);
    throw error;
  }
};

/**
 * Fetch race results for a specific race
 * @param season The F1 season year (e.g., '2024')
 * @param round The race round number
 * @returns Promise with race results data
 */
export const getRaceResults = async (season: string, round: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${season}/${round}/results.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch race results: ${response.status}`);
    }
    
    const data = await response.json();
    return data.MRData.RaceTable.Races[0].Results;
  } catch (error) {
    console.error('Error fetching race results:', error);
    throw error;
  }
};

/**
 * Get F1 historical data from 2015 onwards
 * @param resource The resource to fetch (e.g., 'drivers', 'constructors')
 * @param startYear The starting year (defaults to 2015)
 * @param endYear The ending year (defaults to current year)
 */
export const getHistoricalData = async (resource: 'drivers' | 'constructors', startYear = 2015, endYear = new Date().getFullYear()) => {
  try {
    const allData: any[] = [];
    
    for (let year = startYear; year <= endYear; year++) {
      const response = await fetch(`${BASE_URL}/${year}/${resource}.json`);
      
      if (!response.ok) {
        console.error(`Failed to fetch ${resource} for ${year}: ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      
      if (resource === 'drivers') {
        allData.push({
          year,
          drivers: data.MRData.DriverTable.Drivers
        });
      } else {
        allData.push({
          year,
          constructors: data.MRData.ConstructorTable.Constructors
        });
      }
    }
    
    return allData;
  } catch (error) {
    console.error(`Error fetching historical ${resource} data:`, error);
    throw error;
  }
};

// Helper function to get team color based on constructor name
export const getTeamColor = (constructorName: string): string => {
  const teamColors: Record<string, string> = {
    'Red Bull': '#0600EF',
    'Mercedes': '#00D2BE',
    'Ferrari': '#DC0000',
    'McLaren': '#FF8700',
    'Aston Martin': '#006F62',
    'Alpine': '#0090FF',
    'Williams': '#005AFF',
    'Racing Bulls': '#1E3A94', // AlphaTauri/RB F1 Team
    'RB': '#1E3A94', // Short name for Racing Bulls
    'AlphaTauri': '#2B4562',
    'Sauber': '#900000', // Former Alfa Romeo
    'Kick Sauber': '#900000',
    'Alfa Romeo': '#900000',
    'Haas': '#F0F0F0',
    'Force India': '#F596C8',
    'Renault': '#FFF500',
    'Toro Rosso': '#0005C1',
    'Lotus': '#000000',
    'Manor': '#9B0000',
    // Default color if team not found
    'default': '#666666'
  };
  
  return teamColors[constructorName] || teamColors.default;
};

// Helper function to get driver image URL based on driver ID
export const getDriverImageUrl = (driverId: string): string => {
  // Map of driver IDs to image URLs
  // In a real app, we would use a proper API for this
  // For now, we'll use placeholder images from the official F1 site
  const driverImages: Record<string, string> = {
    'max_verstappen': 'https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png',
    'sergio_perez': 'https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png',
    'lewis_hamilton': 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png',
    'george_russell': 'https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png',
    'charles_leclerc': 'https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png',
    'carlos_sainz': 'https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png',
    'lando_norris': 'https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png',
    'oscar_piastri': 'https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png',
    'fernando_alonso': 'https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png',
    'lance_stroll': 'https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png',
    'daniel_ricciardo': 'https://www.formula1.com/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png.transform/2col/image.png',
    'yuki_tsunoda': 'https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col/image.png',
    'esteban_ocon': 'https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col/image.png',
    'pierre_gasly': 'https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png',
    'alexander_albon': 'https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col/image.png',
    'logan_sargeant': 'https://www.formula1.com/content/dam/fom-website/drivers/L/LOGSAR01_Logan_Sargeant/logsar01.png.transform/2col/image.png',
    'nico_hulkenberg': 'https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png',
    'kevin_magnussen': 'https://www.formula1.com/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png.transform/2col/image.png',
    'valtteri_bottas': 'https://www.formula1.com/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png.transform/2col/image.png',
    'zhou_guanyu': 'https://www.formula1.com/content/dam/fom-website/drivers/G/GUAZHO01_Guanyu_Zhou/guazho01.png.transform/2col/image.png',
  };
  
  return driverImages[driverId] || 'https://www.formula1.com/content/dam/fom-website/drivers/SILP01_SILP01/silp01.png.transform/2col/image.png';
};

// Helper function to get team logo URL based on constructor ID
export const getTeamLogoUrl = (constructorId: string): string => {
  // Map of constructor IDs to logo URLs
  const teamLogos: Record<string, string> = {
    'red_bull': 'https://www.formula1.com/content/dam/fom-website/teams/2023/red-bull-racing.png.transform/2col-retina/image.png',
    'mercedes': 'https://www.formula1.com/content/dam/fom-website/teams/2023/mercedes.png.transform/2col-retina/image.png',
    'ferrari': 'https://www.formula1.com/content/dam/fom-website/teams/2023/ferrari.png.transform/2col-retina/image.png',
    'mclaren': 'https://www.formula1.com/content/dam/fom-website/teams/2023/mclaren.png.transform/2col-retina/image.png',
    'aston_martin': 'https://www.formula1.com/content/dam/fom-website/teams/2023/aston-martin.png.transform/2col-retina/image.png',
    'alpine': 'https://www.formula1.com/content/dam/fom-website/teams/2023/alpine.png.transform/2col-retina/image.png',
    'williams': 'https://www.formula1.com/content/dam/fom-website/teams/2023/williams.png.transform/2col-retina/image.png',
    'racing_bulls': 'https://www.formula1.com/content/dam/fom-website/teams/2023/alphatauri.png.transform/2col-retina/image.png',
    'rb': 'https://www.formula1.com/content/dam/fom-website/teams/2023/alphatauri.png.transform/2col-retina/image.png',
    'sauber': 'https://www.formula1.com/content/dam/fom-website/teams/2023/alfa-romeo.png.transform/2col-retina/image.png',
    'haas': 'https://www.formula1.com/content/dam/fom-website/teams/2023/haas-f1-team.png.transform/2col-retina/image.png',
  };
  
  return teamLogos[constructorId] || 'https://www.formula1.com/content/dam/fom-website/teams/2023/alphatauri.png.transform/2col-retina/image.png';
};

export const getCircuitImageUrl = (circuitId: string): string => {
  const circuitImages: Record<string, string> = {
    'bahrain': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/7col/image.png',
    'jeddah': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Saudi_Arabia_Circuit.png.transform/7col/image.png',
    'albert_park': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit.png.transform/7col/image.png',
    'suzuka': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Japan_Circuit.png.transform/7col/image.png',
    'shanghai': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/China_Circuit.png.transform/7col/image.png',
    'miami': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Miami_Circuit.png.transform/7col/image.png',
    'imola': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Emilia_Romagna_Circuit.png.transform/7col/image.png',
    'monaco': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monaco_Circuit.png.transform/7col/image.png',
    'villeneuve': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Canada_Circuit.png.transform/7col/image.png',
    'catalunya': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Spain_Circuit.png.transform/7col/image.png',
    'red_bull_ring': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Austria_Circuit.png.transform/7col/image.png',
    'silverstone': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit.png.transform/7col/image.png',
    'hungaroring': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Hungary_Circuit.png.transform/7col/image.png',
    'spa': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Belgium_Circuit.png.transform/7col/image.png',
    'zandvoort': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Netherlands_Circuit.png.transform/7col/image.png',
    'monza': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.png.transform/7col/image.png',
    'baku': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Azerbaijan_Circuit.png.transform/7col/image.png',
    'marina_bay': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Singapore_Circuit.png.transform/7col/image.png',
    'americas': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/United_States_Circuit.png.transform/7col/image.png',
    'rodriguez': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Mexico_Circuit.png.transform/7col/image.png',
    'interlagos': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.png.transform/7col/image.png',
    'vegas': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Las_Vegas_Circuit.png.transform/7col/image.png',
    'losail': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Qatar_Circuit.png.transform/7col/image.png',
    'yas_marina': 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit.png.transform/7col/image.png',
  };
  
  return circuitImages[circuitId] || 'https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.png.transform/7col/image.png';
};
