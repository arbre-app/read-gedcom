// https://wiki-en.genealogy.net/GEDCOM-Tags

/**
 * All the standard Gedcom tags.
 */
export const enum Tag {
    Abbreviation = 'ABBR',
    Address = 'ADDR',
    Address1 = 'ADR1',
    Address2 = 'ADR2',
    Address3 = 'ADR3',
    Adoption = 'ADOP',
    AdultChristening = 'CHRA',
    Age = 'AGE',
    Agency = 'AGNC',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    Alias = 'ALIA',
    Ancestors = 'ANCE',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    AncestorInterest = 'ANCI',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    AncestralFileNumber = 'AFN',
    Annulment = 'ANUL',
    Associates = 'ASSO',
    Author = 'AUTH',
    Baptism = 'BAPM',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    BaptismLDS = 'BAPL',
    BarMitzvah = 'BARM',
    BatMitzvah = 'BASM',
    BinaryObject = 'BLOB',
    Birth = 'BIRT',
    Blessing = 'BLES',
    Burial = 'BURI',
    CallNumber = 'CALN',
    Caste = 'CAST',
    Cause = 'CAUS',
    Census = 'CENS',
    Change = 'CHAN',
    Character = 'CHAR',
    Child = 'CHIL',
    ChildrenCount = 'NCHI',
    Christening = 'CHR',
    City = 'CITY',
    Concatenation = 'CONC',
    Confirmation = 'CONF',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    ConfirmationLDS = 'CONL',
    Continuation = 'CONT',
    Copyright = 'COPR',
    Corporate = 'CORP',
    Country = 'CTRY',
    Cremation = 'CREM',
    Data = 'DATA',
    Date = 'DATE',
    Death = 'DEAT',
    Descendants = 'DESC',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    DescendantInt = 'DESI',
    Destination = 'DEST',
    Divorce = 'DIV',
    DivorceFiled = 'DIVF',
    Education = 'EDUC',
    Email = 'EMAIL',
    Emigration = 'EMIG',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    Endowment = 'ENDL',
    Engagement = 'ENGA',
    Event = 'EVEN',
    Fact = 'FACT',
    Family = 'FAM',
    FamilyChild = 'FAMC',
    FamilyFile = 'FAMF',
    FamilySpouse = 'FAMS',
    Fax = 'FAX',
    File = 'FILE',
    FirstCommunion = 'FCOM',
    Format = 'FORM',
    Gedcom = 'GEDC',
    GivenName = 'GIVN',
    Graduation = 'GRAD',
    Header = 'HEAD',
    Husband = 'HUSB',
    IdentificationNumber = 'IDNO',
    Immigration = 'IMMI',
    Individual = 'INDI',
    Language = 'LANG',
    Latitude = 'LATI',
    Legatee = 'LEGA',
    Longitude = 'LONG',
    Map = 'MAP',
    Marriage = 'MARR',
    MarriageBan = 'MARB',
    MarriageContract = 'MARC',
    MarriageCount = 'NMR',
    MarriageLicense = 'MARL',
    MarriageSettlement = 'MARS',
    Media = 'MEDI',
    Name = 'NAME',
    NamePrefix = 'NPFX',
    NameSuffix = 'NSFX',
    Nationality = 'NATI',
    Naturalization = 'NATU',
    Nickname = 'NICK',
    Note = 'NOTE',
    Object = 'OBJE',
    Occupation = 'OCCU',
    Ordinance = 'ORDI',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    Ordination = 'ORDN',
    Page = 'PAGE',
    Pedigree = 'PEDI',
    Phone = 'PHON',
    Phonetic = 'FONE',
    PhysicalDescription = 'DSCR',
    Place = 'PLAC',
    PostalCode = 'POST',
    Probate = 'PROB',
    Property = 'PROP',
    Publication = 'PUBL',
    QualityOfData = 'QUAY',
    RecordFileNumber = 'RFN',
    RecordIdNumber = 'RIN',
    Reference = 'REFN',
    Relationship = 'RELA',
    Religion = 'RELI',
    Repository = 'REPO',
    Residence = 'RESI',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    Restriction = 'RESN',
    Retirement = 'RETI',
    Role = 'ROLE',
    Romanized = 'ROMN',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    SealingChild = 'SLGC',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    SealingSpouse = 'SLGS',
    Sex = 'SEX',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    SocialSecurityNumber = 'SSN',
    Source = 'SOUR',
    State = 'STAE',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    Status = 'STAT',
    /**
     * Obsoleted in Gedcom 5.5.5
     */
    Submission = 'SUBN',
    Submitter = 'SUBM',
    Surname = 'SURN',
    SurnamePrefix = 'SPFX',
    Temple = 'TEMP',
    Text = 'TEXT',
    Time = 'TIME',
    Title = 'TITL',
    Trailer = 'TRLR',
    Type = 'TYPE',
    Version = 'VERS',
    Web = 'WWW',
    Wife = 'WIFE',
    Will = 'WILL',
}
