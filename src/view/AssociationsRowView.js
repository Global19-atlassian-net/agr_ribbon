'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';

import taxa from '../data/taxa';

class AssociationsRowView extends React.Component {

  constructor() {
    super();
    this.state = {
      expanded: false,
      duration: 500,
    }
    this.whenToggleClicked = this.whenToggleClicked.bind(this);
  }

  whenToggleClicked () {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  getTaxonImage(taxid) {
    var image_url = taxa.get(taxid);
    if (image_url === 'undefined' || image_url === null) {
      image_url = 'https://image.freepik.com/free-icon/text-box-without-text_318-33104.jpg';
    }
    return image_url;
  }

  render() {
    const {taxon_node} = this.props;
    var genes = taxon_node.children;
    var row = null;

    var img = this.getTaxonImage(taxon_node.about.id);

    var rows = (
      genes.map((gene_node, i) => {
        var genelink = `http://alliancegenome.org/gene/${gene_node.about.id}`;
        return (
          gene_node.children.map((go_node, j) => {
            var golink = `http://amigo.geneontology.org/amigo/term/${go_node.about.id}`;
            if (i === 0 && j === 0) {
              return (
                <div className='assoc-row' style={{backgroundColor: taxon_node.color}}>
                  <div className="taxon-toggle" >
                    <img className='taxon-img' src={img} />
                  </div>
                  <div className='assoc-gene' >
                    <a title={genelink} href={genelink}>{gene_node.about.label}</a>
                  </div>
                  <div className='assoc-go'>
                    <a title={golink} href={golink}>{go_node.about.label}</a>
                  </div>
                </div>
              );
            }
            if (j === 0) {
              return (
                <div className='assoc-row' style={{backgroundColor: taxon_node.color}}>
                  <div className="taxon-toggle" />
                  <div className='assoc-gene' >
                    <a title={genelink} href={genelink}>{gene_node.about.label}</a>
                  </div>
                  <div className='assoc-go'>
                    <a title={golink} href={golink}>{go_node.about.label}</a>
                  </div>
                </div>
              );
            }
            return (
              <div className='assoc-row' style={{backgroundColor: taxon_node.color}}>
                <div className="taxon-toggle" />
                <div className='assoc-gene' />
                <div className='assoc-go'>
                  <a title={golink} href={golink}>{go_node.about.label}</a>
                </div>
              </div>
            );
          })
        );
      })
    );
    return (
      <div className='assoc-view'>{rows}</div>
    );
  }
}
AssociationsRowView.propTypes = {
  taxon_node: PropTypes.object.isRequired,
};

export default AssociationsRowView;