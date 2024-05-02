import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobList } from '../redux/slice/list';
import { Card, CardContent, Typography, Grid, Container, Button } from '@mui/material';
import './MainSection.css';
import FilterData from './FilterData';

const MainSection = () => {
  const fullJobList = useSelector((state) => state.list.data?.jdList || []);
  const dispatch = useDispatch();
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [filteredJobList, setFilteredJobList] = useState([]);
  const containerRef = useRef(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    dispatch(fetchJobList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredJobList(fullJobList.slice(0, 10));
    setScrollable(true);
  }, [fullJobList]);

  const handleFilterChange = (filterOptions) => {
    let filteredJobs = [...fullJobList];

    if (filterOptions.minExp !== '') {
      filteredJobs = filteredJobs.filter(job => job.minExp === filterOptions.minExp);
    }
    if (filterOptions.location !== '') {
      filteredJobs = filteredJobs.filter(job => job.location === filterOptions.location);
    }
    if (filterOptions.remote !== '') {
      filteredJobs = filteredJobs.filter(job => job.remote === filterOptions.remote);
    }
    if (filterOptions.jobRole !== '') {
      filteredJobs = filteredJobs.filter(job => job.jobRole === filterOptions.jobRole);
    }
    if (filterOptions.minJdSalary !== '') {
      filteredJobs = filteredJobs.filter(job => job.minJdSalary === filterOptions.minJdSalary);
    }

    setFilteredJobList(filteredJobs.slice(0, 10));

    setScrollable(true);
  };
  
  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollHeight - scrollTop === clientHeight && scrollable) {
      if (filteredJobList.length < fullJobList.length) {
        const nextItems = fullJobList.slice(filteredJobList.length, filteredJobList.length + 10);
        setFilteredJobList(prevList => [...prevList, ...nextItems]);
      }
    }
  };

  return (
    <>
      <FilterData onFilterChange={handleFilterChange} />
      <Container ref={containerRef} onScroll={handleScroll} maxWidth="lg" style={{ marginTop: '70px', padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
        <Grid container spacing={3}>
          {filteredJobList.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Card className="custom-card" onClick={() => handleExpand(index)}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {item.jobRole}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {item.location}
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>About Company:</strong>{' '}
                    {expandedIndex === index
                      ? item.jobDetailsFromCompany
                      : `${item.jobDetailsFromCompany.slice(0, 300)}...`}
                    {item.jobDetailsFromCompany.length > 300 && (
                      <Button size="small">
                        {expandedIndex === index ? 'Show Less' : 'Load More'}
                      </Button>
                    )}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '10px' }}>
                    <strong style={{ color: "gray" }}>Minimum Experience</strong> <br />
                    <strong>{item.minExp || ""}Years</strong>
                  </Typography>
                  <a href={item.jdLink} target="_blank" rel="noopener noreferrer" className="button-link">
                    <Button variant="contained" style={{ width: "100%", marginTop: '10px', backgroundColor: "cyan", color: "black" }}>
                      <strong>Easy Apply</strong>
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container >
    </>
  );
};

export default MainSection;
