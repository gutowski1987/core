import { MSGraphClient } from "@microsoft/sp-http";
import { ITeam, IChannel } from "../interfaces";
import { ITeamsService } from "./ITeamsService";

export class TeamsService implements ITeamsService {

  private _graphClient: MSGraphClient;


  /**
 * class constructor
 * @param _graphClient the graph client to be used on the request
 */
  constructor(graphClient: MSGraphClient) {
    // set web part context
    this._graphClient = graphClient;
  }

  public GetTeams = async (): Promise<ITeam[]> => {
    return await this._getTeams();
  }

  private _getTeams = async (): Promise<ITeam[]> => {
    let myTeams: ITeam[] = [];
    try {
      const groupsResponse = await this._graphClient.api('groups').version('v1.0').get();
      //const teamsResponse = await this._graphClient.api('groups/0552f039-8915-42ba-94e3-ac70e08a0ee2/members').version('v1.0').get();
      //const activityResponse = await this._graphClient.api('reports/getOffice365GroupsActivityDetail(period=\'D7\')').version('v1.0').get();
      //console.log(activityResponse.value.length);
      //myTeams = teamsResponse.value as ITeam[];
      groupsResponse.value.forEach(team => {
        team.resourceProvisioningOptions.forEach(el => {
          if(el = "Team") {
            myTeams.push(team);
          }
        }
        );
      });
      
      this._getMembers(myTeams);

    } catch (error) {
      console.log('Error getting teams', error);
    }
    return myTeams;
  }

  private _getMembers = (teams) => {
    teams.forEach(team => {
      const teamID = team.teamId;
      console.log(teamID);
      //const amount = await this._graphClient.api('groups/' + teamID + '/members').version('v1.0').get();
      //console.log(amount.value.length);
      
    });
  }

  public GetTeamChannels = async (teamId): Promise<IChannel[]> => {
    return await this._getTeamChannels(teamId);
  }

  private _getTeamChannels = async (teamId): Promise<IChannel[]> => {
    let channels: IChannel[] = [];
    try {
      const channelsResponse = await this._graphClient.api(`teams/${teamId}/channels`).version('v1.0').get();
      channels = channelsResponse.value as IChannel[];
    } catch (error) {
      console.log('Error getting channels for team ' + teamId, error);
    }
    return channels;
  }

}
