import Gender from '../models/Gender.js'
import State from '../models/State.js'
import AccountType from '../models/AccountType.js'
import BillingStatus from '../models/BillingStatus.js'
import * as helperController from './helperController.js'

export async function getEssentials (req, res){
    try{
        const genders = await Gender.find().select('-__v')
        const states = await State.find().select('-__v')
        const accountTypes = await AccountType.find().select('-__v')
        const billingStatuses = await BillingStatus.find().select('-__v')

        res.json({
            genders,  states, 
            accountTypes, billingStatuses
        })
    }catch(error){
        helperController.ExportError(res, error)
    }
}

// #region --------- GENDER METHODS ---------------
export async function addGender(req, res){
    try{
        const {name, abbr} = req.body;

        if(!name || !abbr) return res.status(400).json({message: 'A Gender name and/or Abbreviation is required', type: 'error'})

        let newGender = await Gender.findOne({name, abbr});

        if(newGender) return res.status(400).json({message: 'Gender already exists', type: 'error'})

        newGender = new Gender(req.body);

        await newGender.save();

        res.json({
            gender: newGender,
            alert: {message: 'Gender successfully created', type: 'success'}
        })
    }catch(error){
        helperController.ExportError(res, error)
    }
}

export async function updateGender(req, res){
    try{
        const {genderId} = req.params;

        const updatedGender = await Gender.findByIdAndUpdate(genderId, req.body, {new: true})

        res.send(updatedGender)
    }catch(error){
        helperController.ExportError({res, error})
    }
}

// #endregion