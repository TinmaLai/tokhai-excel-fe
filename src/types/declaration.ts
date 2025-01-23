export interface FormData {
    businessType: string
    declarationNumber: string
    sequence: string
    firstDeclarationNumber: string
    branchNumber: string
    correspondingDeclaration: string
    typeCode: string
    goodsClassification: string
    customsOffice: string
    declarationProcessor: string
    registrationDate: string
    warehouseLocation: string
    expectedDeclarationDate: string
    exporter: {
      code: string
      name: string
      postalCode: string
      address: string
      phone: string
    }
    authorizedExporter: {
      code: string
      name: string
    }
    importer: {
      code: string
      name: string
      postalCode: string
    }
  }
  
  