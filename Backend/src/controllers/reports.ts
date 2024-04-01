import {  Request, Response } from 'express';
import { prismaclient } from '..';

//get all reports
export const getAllReports = async (req: Request, res: Response) => {
    try {
        const reports = await prismaclient.report.findMany();
        res.status(200).json({reports});
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
}

// get a report by id
export const getReportById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const report = await prismaclient.report.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!report) {
            return res.status(404).json({error: 'Report not found'});
        }
        res.status(200).json({report});
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
}

// add a report by a company about a testimonial
export const createReport = async (req: Request, res: Response) => {
    try {
      const { companyId, testimonialId, reason } = req.body;
  
      // Check if the company exists
      const company = await prismaclient.company.findUnique({
        where: { id: companyId },
      });
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      // Check if the testimonial exists
      const testimonial = await prismaclient.testimonial.findUnique({
        where: { id: testimonialId },
      });
      if (!testimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
  
      // Create the report
      
  
    } catch (error) {
      console.error('Error creating report:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

