import {
  DonationParams,
  DonationParamsNNS,
  StudentOutput,
} from "./declarations/backend/backend.did";
import { makeBackendActor } from "./backend-actor-locator";
import { SchoolOutput } from "./declarations/backend/backend.did";

export const getSchools = async () => {
  const backendService = await makeBackendActor();
  const noOfSchools = await backendService.get_total_schools();
  let schools: SchoolOutput[] = [];
  for (let i = 1; i <= Number(noOfSchools.toString()); i++) {
    const school = await getSchoolById(i.toString());
    schools.push(school);
  }
  return schools;
};

export const getNoOfSchools = async () => {
  const backendService = await makeBackendActor();
  const noOfSchools = await backendService.get_total_schools();
  return noOfSchools;
};

export const getStudentBySchool = async (students: any[]) => {
  let studentsData: StudentOutput[] = [];
  for (let i of students) {
    const student = await getStudentById(i.toString());
    studentsData.push(student);
  }
  return studentsData;
};

export const getDonationByDTI = async (dti: string) => {
  const backendService = await makeBackendActor();
  return backendService.get_donation(dti);
};

export const getAllDonations = async () => {
  const backendService = await makeBackendActor();
  return backendService.list_donations();
};

export const getSchoolById = async (id: string | bigint) => {
  const backendService = await makeBackendActor();
  const res: any = await backendService.get_school(BigInt(id));
  if (res.err) {
    throw new Error(res.err);
  }
  return res.ok;
};

export const getStudentById = async (id: string | bigint) => {
  const backendService = await makeBackendActor();
  const res: any = await backendService.get_student(BigInt(id));
  if (res.err) {
    throw new Error(res.err);
  }
  return res.ok;
};

export const getBitcoinAddress = async () => {
  const backendService = await makeBackendActor();
  return backendService.get_p2pkh_address();
};

export const getBitcoinBalance = async () => {
  const backendService = await makeBackendActor();
  const address = await getBitcoinAddress();
  return backendService.get_btc_balance(address);
};

export const getCKBTCBalance = async () => {
  const backendService = await makeBackendActor();
  return backendService.get_ckBtc_balance();
};

export const getCKBTCAddress = async () => {
  const backendService = await makeBackendActor();
  return backendService.get_canister_id();
};

export const makeDonation = async (donation: DonationParams) => {
  const backendService = await makeBackendActor();
  return backendService.create_donation_record(donation);
};
