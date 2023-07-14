import React , {useEffect, useState} from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {Header, RepositoryInfo, Issues} from "./styles"
import logoImg from '../../assets/github-mark.svg'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import api from '../../services/api'

interface RepositoryParams{
    repository: string
}

interface Repository
{
full_name: string
description: string
stargazers_count: string;
forks_count: number;
open_issues_count: number;
owner: {
    login: string
    avatar_url: string
    }
}

interface Issue{
    title: string;
    html_url: string;
    id: number;
    user: {
        login: string;
    }
}

const Repository: React.FC = () => {

    const [repository, setRepository] = useState<Repository | null>(null)
    const [issues, setIssues] = useState<Issue[]>([])

    const {params} = useRouteMatch<RepositoryParams>()
    
    useEffect (() => {
        api.get(`repos/${params.repository}`).then(response => {
            setRepository(response.data)
        })

        api.get(`repos/${params.repository}/issues`).then(response => {
            setIssues(response.data)
        })

    }, [params.repository])

    return (
        <>
        <Header>
            <img src={logoImg} alt="GitHub Explorer" />
            <Link to="/dashboard">
                <FiChevronLeft size={16}/>
                Voltar
            </Link>
        </Header>

    {repository && (
            <RepositoryInfo>    
            <header>
                <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                <div>
                    <strong> {repository.full_name}</strong>
                    <p> {repository.description}</p>
                </div>
            </header>
            <ul>
                <li>
                    <strong> {repository.stargazers_count} </strong>
                    <strong> Stasrs </strong>
                </li>
                <li>
                    <strong> {repository.forks_count} </strong>
                    <strong> Forks </strong>
                </li>
                <li>
                    <strong> {repository.open_issues_count} </strong>
                    <strong> Issues </strong>
                </li>
            </ul>
        </RepositoryInfo>
    )}

        <Issues>
            {issues.map(issue => (
                              <a key={issue.id} href={issue.html_url}>
                              <div>
                                  <strong> {issue.title} </strong>
                                  <p> {issue.user.login} </p>
                              </div>
                              <FiChevronRight size={20}/>
                          </a>
            ))}
        </Issues>
        </>

    )
}

export default Repository