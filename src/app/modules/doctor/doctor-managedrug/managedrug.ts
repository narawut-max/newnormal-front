import { Time } from "@angular/common";

export interface Managedrug {
    billId: number,
    billdrug: {
        billId: number,
        billDate: Date,
        billNext: string,
        billdrugDetails: [
            {
                billId: number,
                billdrugDetailId: number,
                drugCount: string,
                drugId: number,
                drugName: string,
                drugPrice: number,
                drugTotalPrice: number
            }
        ],
        drugId: string,
        tmId: number
    },
    bkId: number,
    booking: {
        bkDate: Date,
        bkId: number,
        bkQueue: string,
        bkStatus: string,
        bkSymptom: string,
        bkTime: Time
    },
    tmDate: Date,
    tmId: number,
    tmMoney: number,
    tmProcess: string,
    tmSlip: string,
    tmStatus: string,
    tmTime: Time,
    user: {
        role: {
            roleDescription: string,
            roleId: string,
            roleName: string,
            roleStatus: string
        },
        roleId: string,
        userAddrass: string,
        userAllergy: string,
        userBirthday: string,
        userBlood: string,
        userCardId: string,
        userDepartment: string,
        userDisease: string,
        userEmail: string,
        userFirstname: string,
        userGender: string,
        userGraduate: string,
        userHnId: string,
        userId: number,
        userLastname: string,
        userPassword: string,
        userPhone: string,
        userPosition: string,
        userProfession: string,
        userProfessionId: string,
        userStatus: string,
        userTitle: string,
        userUsername: string,
        zipCode: string
    },
    userId: string
}