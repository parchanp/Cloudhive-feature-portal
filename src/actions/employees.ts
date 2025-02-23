"use server"
import { Employee } from '@/utils/types';
import {promises as fs} from 'fs';
import path from 'path'

const FILE_PATH = path.join(process.cwd() , 'data' ,'employees.json')

export async function fetchEmployees(){
    const data = await fs.readFile(FILE_PATH , 'utf-8')
    const employees: Employee[] = JSON.parse(data)
    return employees
}