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

export async function deleteGender(req, res){
    try{
        
        const {genderId} = req.params;

        await Gender.findByIdAndDelete(genderId);

        res.json({message: 'Gender Successfully Deleted', type: 'success'})
    }catch(error){
        helperController.ExportError(res, error)
    }
}

// #endregion

// #region --------- STATE METHODS ---------------
export async function addState(req, res){
    try{
        const {name, abbr} = req.body;

        if(!name || !abbr) return res.status(400).json({message: 'A State name and/or Abbreviation is required', type: 'error'})

        let newState = await State.findOne({name, abbr});

        if(newState) return res.status(400).json({message: 'State already exists', type: 'error'})

        newState = new State(req.body);

        await newState.save();

        res.json({
            state: newState,
            alert: {message: 'State successfully created', type: 'success'}
        })
    }catch(error){
        helperController.ExportError(res, error)
    }
}

export async function updateState(req, res){
    try{
        const {stateId} = req.params;

        const updatedState = await State.findByIdAndUpdate(stateId, req.body, {new: true})

        res.send(updatedState)
    }catch(error){
        helperController.ExportError({res, error})
    }
}

export async function deleteState(req, res){
    try{
        
        const {stateId} = req.params;

        await State.findByIdAndDelete(stateId);

        res.json({message: 'State Successfully Deleted', type: 'success'})
    }catch(error){
        helperController.ExportError(res, error)
    }
}
// #endregion

// #region --------- BILLING STATUS METHODS ---------------

export async function addStatus(req, res){
    try{
        const {name} = req.body;

        if(!name) return res.status(400).json({message: 'A Status name is required', type: 'error'})

        let newStatus = await BillingStatus.findOne({name});

        if(newStatus) return res.status(400).json({message: 'Status already exists', type: 'error'})

        newStatus = new BillingStatus(req.body);

        await newStatus.save();

        res.json({
            status: newStatus,
            alert: {message: 'Status successfully created', type: 'success'}
        })
    }catch(error){
        helperController.ExportError(res, error)
    }
}

export async function updateStatus(req, res){
    try{
        const {statusId} = req.params;

        const updatedStatus = await BillingStatus.findByIdAndUpdate(statusId, req.body, {new: true})

        res.send(updatedStatus)
    }catch(error){
        helperController.ExportError({res, error})
    }
}

export async function deleteStatus(req, res){
    try{
        
        const {statusId} = req.params;

        await BillingStatus.findByIdAndDelete(statusId);

        res.json({message: 'Status Successfully Deleted', type: 'success'})
    }catch(error){
        helperController.ExportError(res, error)
    }
}

// #endregion


// #region --------- ACCOUNT TYPE METHODS ---------------

export async function addAccountType(req, res){
    try{
        const {name, rate} = req.body;

        if(!name || !rate) return res.status(400).json({message: 'A name and/or rate is required', type: 'error'})

        let newType = await AccountType.findOne({name});

        if(newType) return res.status(400).json({message: 'Account Type already exists', type: 'error'})

        newType = new AccountType(req.body);

        await newType.save();

        res.json({
            accountType: newType,
            alert: {message: 'Account Type successfully created', type: 'success'}
        })
    }catch(error){
        helperController.ExportError(res, error)
    }
}

export async function updateAccountType(req, res){
    try{
        const {typeId} = req.params;

        const updateAccountType = await BillingStatus.findByIdAndUpdate(typeId, req.body, {new: true})

        res.json(updateAccountType)
    }catch(error){
        helperController.ExportError({res, error})
    }
}

export async function deleteAccountType(req, res){
    try{
        
        const {typeId} = req.params;

        await AccountType.findByIdAndDelete(typeId);

        res.json({message: 'Account Type Successfully Deleted', type: 'success'})
    }catch(error){
        helperController.ExportError(res, error)
    }
}

// #endregion